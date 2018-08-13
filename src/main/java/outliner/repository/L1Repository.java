package outliner.repository;

import outliner.domain.L1;
import outliner.persistence.CustomRepository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the L1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface L1Repository extends CustomRepository<L1, Long> {

}
