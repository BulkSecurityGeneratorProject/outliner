package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.domain.L3Table;
import outliner.persistence.CustomRepository;


/**
 * Spring Data  repository for the L3Table entity.
 */
@Repository
public interface L3TableRepository extends CustomRepository<L3Table, Long> {

}
